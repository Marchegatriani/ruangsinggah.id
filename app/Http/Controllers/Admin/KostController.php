<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kost;
use App\Models\Campus;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class KostController extends Controller
{
    /**
     * Menampilkan daftar semua kost.
     */
    public function index()
    {
        return Inertia::render('Admin/Kost/Index', [
            'listings' => Kost::with(['images'])->latest()->get()
        ]);
    }

    /**
     * Form tambah kost baru.
     */
    public function create()
    {
        return Inertia::render('Admin/Kost/Create', [
            'campuses' => Campus::all()
        ]);
    }

    /**
     * Menyimpan data kost baru ke MySQL (Termasuk data JSON).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'type'        => 'required|in:Putra,Putri,Campur',
            'description' => 'nullable|string',
            'address'     => 'required|string',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
            'is_verified' => 'boolean',
            'facilities'  => 'nullable|array',
            'rules'       => 'nullable|array',
            'roomTypes'   => 'required|array|min:1',
            'roomTypes.*.name' => 'required|string',
            'roomTypes.*.pricing' => 'required|array',
        ]);

        // LOGIKA OTOMATIS: Cari harga paling murah dari semua tipe kamar & periode
        // Ini berguna agar di halaman depan user bisa melihat "Mulai dari Rp XXX"
        $prices = [];
        foreach ($request->roomTypes as $room) {
            foreach ($room['pricing'] as $p) {
                if (isset($p['price']) && $p['price'] > 0) {
                    $prices[] = (int) $p['price'];
                }
            }
        }
        $validated['price'] = !empty($prices) ? min($prices) : 0;

        // Simpan ke Database
        // Laravel secara otomatis mengubah array menjadi JSON string untuk MySQL
        Kost::create($validated);
        
        return redirect()->route('admin.kost.index')->with('success', 'Properti dan Tipe Kamar berhasil disimpan.');
    }

    /**
     * Menampilkan detail kost.
     */
    public function show(Kost $kost)
    {
        return Inertia::render('Admin/Kost/Show', [
            'kost' => $kost->load(['images', 'campuses'])
        ]);
    }

    /**
     * Form edit kost.
     */
    public function edit(Kost $kost)
    {
        return Inertia::render('Admin/Kost/Edit', [
            'kost' => $kost->load('images'),
            'campuses' => Campus::all()
        ]);
    }

    /**
     * Update data kost (Termasuk data JSON).
     */
    public function update(Request $request, Kost $kost)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'type'        => 'required|in:Putra,Putri,Campur',
            'description' => 'nullable|string',
            'address'     => 'required|string',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
            'is_verified' => 'boolean',
            'facilities'  => 'nullable|array',
            'rules'       => 'nullable|array',
            'roomTypes'   => 'required|array',
        ]);

        // Rekalkulasi harga terendah saat update
        $prices = [];
        foreach ($request->roomTypes as $room) {
            foreach ($room['pricing'] as $p) {
                if (isset($p['price']) && $p['price'] > 0) {
                    $prices[] = (int) $p['price'];
                }
            }
        }
        $validated['price'] = !empty($prices) ? min($prices) : 0;

        $kost->update($validated);
        
        return redirect()->route('admin.kost.index')->with('success', 'Data properti berhasil diperbarui.');
    }

    /**
     * Menghapus kost.
     */
    public function destroy(Kost $kost)
    {
        $kost->delete();
        return redirect()->back()->with('success', 'Properti berhasil dihapus.');
    }

    /**
     * Menampilkan statistik transaksi (Sesuai kode lama Anda).
     */
    public function transactions()
    {
        $stats = [
            'totalRenters' => Booking::where('status', 'success')->distinct('user_id')->count(),
            'totalRented'  => Booking::where('status', 'success')->count(),
            'rentRevenue'  => Booking::where('status', 'success')->sum('total_price') ?? 0,
        ];

        // Mengambil data tren 6 bulan terakhir
        $trendData = collect(range(5, 0))->map(function ($i) {
            $date = now()->subMonths($i);
            return [
                'time'       => $date->format('M'),
                'sewa'       => Booking::where('status', 'success')->whereMonth('created_at', $date->month)->whereYear('created_at', $date->year)->count(),
                'pendapatan' => Booking::where('status', 'success')->whereMonth('created_at', $date->month)->whereYear('created_at', $date->year)->sum('total_price') ?? 0,
            ];
        });

        return Inertia::render('Admin/Transaction/Rent', [
            'transactions' => Booking::with(['user', 'kost'])->latest()->get(),
            'stats'        => $stats,
            'trendData'    => $trendData
        ]);
    }
}