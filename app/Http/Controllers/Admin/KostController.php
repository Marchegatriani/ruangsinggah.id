<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kost;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KostController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Kost/Index', [
            'listings' => Kost::with('images')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'price' => 'required|numeric',
            'type' => 'required|string',
        ]);

        Kost::create($validated);
        return redirect()->back()->with('success', 'Kost berhasil ditambahkan.');
    }

    public function update(Request $request, Kost $kost)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'price' => 'required|numeric',
            'type' => 'required|string',
        ]);

        $kost->update($validated);
        return redirect()->back()->with('success', 'Kost berhasil diperbarui.');
    }

    public function destroy(Kost $kost)
    {
        $kost->delete();
        return redirect()->back()->with('success', 'Kost berhasil dihapus.');
    }

    public function transactions()
    {
        $stats = [
            'totalRenters' => Booking::where('status', 'success')->distinct('user_id')->count(),
            'totalRented' => Booking::where('status', 'success')->count(),
            'rentRevenue' => Booking::where('status', 'success')->sum('total_price') ?? 0,
        ];

        $trendData = collect(range(5, 0))->map(function ($i) {
            $date = now()->subMonths($i);
            return [
                'time' => $date->format('M'),
                'sewa' => Booking::where('status', 'success')->whereMonth('created_at', $date->month)->count(),
                'pendapatan' => Booking::where('status', 'success')->whereMonth('created_at', $date->month)->sum('total_price') ?? 0,
            ];
        });

        return Inertia::render('Admin/Transaction/Rent', [
            'transactions' => Booking::with(['user', 'kost'])->latest()->get(),
            'stats' => $stats,
            'trendData' => $trendData
        ]);
    }
}