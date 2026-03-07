<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DatabaseProduct;
use App\Models\DatabaseOrder; // Pastikan model ini sudah dibuat
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DatabaseProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/DatabaseKost/Index', [
            'products' => DatabaseProduct::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/DatabaseKost/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campus'      => 'required|string|max:255',
            'city'        => 'required|string|max:255',
            'area'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'total_data'  => 'required|integer',
            'description' => 'required|string',
            'file_type'   => 'required|in:upload,link',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'file_path'   => $request->file_type === 'upload' ? 'required|file|max:10240' : 'required|string',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('databases/covers', 'public');
        }

        if ($request->file_type === 'upload' && $request->hasFile('file_path')) {
            $validated['file_path'] = $request->file('file_path')->store('databases/files', 'public');
        }

        DatabaseProduct::create($validated);

        return redirect()->route('admin.database.index')->with('success', 'Database berhasil diterbitkan.');
    }

    public function edit(DatabaseProduct $database)
    {
        return Inertia::render('Admin/DatabaseKost/Edit', [
            'product' => $database
        ]);
    }

    public function update(Request $request, DatabaseProduct $database)
    {
        $validated = $request->validate([
            'campus'      => 'required|string|max:255',
            'city'        => 'required|string|max:255',
            'area'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'total_data'  => 'required|integer',
            'description' => 'required|string',
            'file_type'   => 'required|in:upload,link',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($database->cover_image) Storage::disk('public')->delete($database->cover_image);
            $validated['cover_image'] = $request->file('cover_image')->store('databases/covers', 'public');
        }

        if ($request->file_type === 'upload' && $request->hasFile('file_path')) {
            if ($database->file_path && $database->file_type === 'upload') Storage::disk('public')->delete($database->file_path);
            $validated['file_path'] = $request->file('file_path')->store('databases/files', 'public');
        } elseif ($request->file_type === 'link') {
            $validated['file_path'] = $request->file_path;
        }

        $database->update($validated);

        return redirect()->route('admin.database.index')->with('success', 'Database berhasil diperbarui.');
    }

    /**
     * Manajemen Transaksi Database.
     */
    public function transactions()
    {
        // 1. Ambil statistik ringkasan
        $stats = [
            'totalDbBuyers' => DatabaseOrder::where('status', 'success')->distinct('user_id')->count(),
            'totalDbSold'   => DatabaseOrder::where('status', 'success')->count(),
            'dbRevenue'     => (int) DatabaseOrder::where('status', 'success')->sum('amount'),
        ];

        // 2. Ambil data untuk grafik (6 bulan terakhir)
        $trendData = collect(range(5, 0))->map(function ($i) {
            $date = now()->subMonths($i);
            return [
                'time' => $date->format('M'),
                'penjualan' => DatabaseOrder::where('status', 'success')
                                ->whereMonth('created_at', $date->month)
                                ->whereYear('created_at', $date->year)
                                ->count(),
                'pendapatan' => (int) DatabaseOrder::where('status', 'success')
                                ->whereMonth('created_at', $date->month)
                                ->whereYear('created_at', $date->year)
                                ->sum('amount'),
            ];
        });

        // 3. Render ke halaman Index Transaksi Database
        return Inertia::render('Admin/Transactions/Db/Index', [
            'transactions' => DatabaseOrder::with(['user', 'databaseProduct'])->latest()->get(),
            'stats' => $stats,
            'trendData' => $trendData
        ]);
    }

    /**
     * Update Status Order (Konfirmasi/Batal).
     */
    public function updateOrderStatus(Request $request, DatabaseOrder $order)
    {
        $request->validate(['status' => 'required|in:pending,success,cancelled']);
        $order->update(['status' => $request->status]);

        return back()->with('success', 'Status pesanan database diperbarui.');
    }

    public function destroy(DatabaseProduct $database)
    {
        if ($database->cover_image) Storage::disk('public')->delete($database->cover_image);
        if ($database->file_type === 'upload' && $database->file_path) Storage::disk('public')->delete($database->file_path);
        
        $database->delete();
        return redirect()->back()->with('success', 'Database berhasil dihapus.');
    }
}