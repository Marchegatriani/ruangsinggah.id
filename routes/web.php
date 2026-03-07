<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\KostController;
use App\Http\Controllers\DatabaseProductController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\MitraController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\SocialiteController;
// Alias untuk Admin Controller agar tidak bentrok
use App\Http\Controllers\Admin\KostController as AdminKostController;
use App\Http\Controllers\Admin\DatabaseProductController as AdminDatabaseController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('welcome');
Route::get('/jasa-survey', [SurveyController::class, 'index'])->name('survey.index');
Route::get('/bermitra', [MitraController::class, 'index'])->name('mitra.index');
Route::post('/bermitra', [MitraController::class, 'store'])->name('mitra.store');

/*
|--------------------------------------------------------------------------
| User Routes (Khusus Role: user)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/kost', [KostController::class, 'index'])->name('kost.index');
    Route::get('/database-kost', [DatabaseProductController::class, 'index'])->name('database.index');
    Route::get('/kost/{id}', [KostController::class, 'show'])->name('kost.show');
});

/*
|--------------------------------------------------------------------------
| Admin Routes (Khusus Role: admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // CRUD Kost
    Route::get('/kost', [AdminKostController::class, 'index'])->name('kost.index');
    Route::get('/kost/create', [AdminKostController::class, 'create'])->name('kost.create');
    Route::post('/kost', [AdminKostController::class, 'store'])->name('kost.store');
    Route::get('/kost/{kost}', [AdminKostController::class, 'show'])->name('kost.show');
    Route::get('/kost/{kost}/edit', [AdminKostController::class, 'edit'])->name('kost.edit');
    Route::patch('/kost/{kost}', [AdminKostController::class, 'update'])->name('kost.update');
    Route::delete('/kost/{kost}', [AdminKostController::class, 'destroy'])->name('kost.destroy');

    // CRUD Database
    Route::get('/database-kost', [AdminDatabaseController::class, 'index'])->name('database.index');
    Route::post('/database-kost', [AdminDatabaseController::class, 'store'])->name('database.store');
    Route::patch('/database-kost/{databaseProduct}', [AdminDatabaseController::class, 'update'])->name('database.update');
    Route::delete('/database-kost/{databaseProduct}', [AdminDatabaseController::class, 'destroy'])->name('database.destroy');

    Route::get('/verifikasi-kost', fn() => Inertia::render('Admin/Verification/Index'))->name('verification.index');
    Route::get('/transaksi-sewa', [AdminKostController::class, 'transactions'])->name('transactions.rent');
    Route::get('/transaksi-db', [AdminDatabaseController::class, 'transactions'])->name('transactions.db');
    Route::get('/jasa-survey', fn() => Inertia::render('Admin/Survey/Index'))->name('survey.index');
    Route::get('/pendaftar-mitra', fn() => Inertia::render('Admin/Mitra/Index'))->name('mitra.index');
    Route::get('/komplain', fn() => Inertia::render('Admin/Complaints/Index'))->name('complaints.index');

    });

/*
|--------------------------------------------------------------------------
| Shared Authenticated Routes (Profile)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Social Login Routes
|--------------------------------------------------------------------------
*/
Route::get('/auth/google', [SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

require __DIR__.'/auth.php';