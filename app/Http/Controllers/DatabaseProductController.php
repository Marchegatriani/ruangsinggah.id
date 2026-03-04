<?php

namespace App\Http\Controllers;

use App\Models\DatabaseProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class DatabaseProductController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('User/DatabaseKost', [
            'products' => DatabaseProduct::all(),
            'initialId' => $request->query('productId'),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}