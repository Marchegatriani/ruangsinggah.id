<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    /**
     * Menampilkan halaman landing page dengan daftar kost terbaru.
     */
    public function index()
    {
        // Mengambil data kost beserta relasi gambarnya.
        // Kita ambil 6 data terbaru untuk ditampilkan di section "Hunian Terverifikasi".
        $listKost = Kost::with('images')
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Welcome', [
            'listKost' => $listKost,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}