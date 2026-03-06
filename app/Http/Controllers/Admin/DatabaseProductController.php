<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DatabaseProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DatabaseProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Database/Index', [
            'products' => DatabaseProduct::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campus' => 'required|string',
            'city' => 'required|string',
            'area' => 'required|string',
            'price' => 'required|numeric',
            'total_data' => 'required|integer',
            'description' => 'required|string',
        ]);

        DatabaseProduct::create($validated);
        return redirect()->back()->with('success', 'Database berhasil ditambahkan.');
    }

    public function update(Request $request, DatabaseProduct $databaseProduct)
    {
        $validated = $request->validate([
            'campus' => 'required|string',
            'city' => 'required|string',
            'area' => 'required|string',
            'price' => 'required|numeric',
            'total_data' => 'required|integer',
            'description' => 'required|string',
        ]);

        $databaseProduct->update($validated);
        return redirect()->back()->with('success', 'Database berhasil diperbarui.');
    }

    public function destroy(DatabaseProduct $databaseProduct)
    {
        $databaseProduct->delete();
        return redirect()->back()->with('success', 'Database berhasil dihapus.');
    }

    public function transactions()
    {
        return Inertia::render('Admin/Transactions/Db', [
            'stats' => [
                'totalDbBuyers' => 0, // Implementasikan sesuai model transaksi DB Anda
                'totalDbSold' => 0,
                'dbRevenue' => 0,
            ],
            'trendData' => []
        ]);
    }
}