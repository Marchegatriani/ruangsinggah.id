<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\KostController;
use App\Http\Controllers\DatabaseProductController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\MitraController;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('welcome');
Route::get('/jasa-survey', [SurveyController::class, 'index'])->name('survey.index');
Route::get('/bermitra', [MitraController::class, 'index'])->name('mitra.index');
Route::post('/bermitra', [MitraController::class, 'store'])->name('mitra.store');

// Proteksi akses untuk tamu: Klik menu ini akan diarahkan ke login
Route::middleware('auth')->group(function () {
    Route::get('/kost', [KostController::class, 'index'])->name('kost.index');
    Route::get('/database-kost', [DatabaseProductController::class, 'index'])->name('database.index');
    Route::get('/kost/{id}', [KostController::class, 'show'])->name('kost.show');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Google Login Routes
Route::get('/auth/google', [App\Http\Controllers\Auth\SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [App\Http\Controllers\Auth\SocialiteController::class, 'handleGoogleCallback']);

require __DIR__.'/auth.php';
