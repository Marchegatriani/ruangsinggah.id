<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class KostController extends Controller
{
    public function index()
    {
        // Ambil data kost lengkap dengan gambar dan kampus untuk ditampilkan di halaman pencarian
        $listings = Kost::with(['images', 'campuses'])->latest()->get();

        return Inertia::render('User/Index', [
            'listings' => $listings,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function show($id)
    {
        // Ambil detail satu kost lengkap dengan SEMUA gambar dan kampusnya
        $kost = Kost::with(['images', 'campuses'])->findOrFail($id);

        return Inertia::render('Kost/Show', [
            'kost' => $kost
        ]);
    }
}