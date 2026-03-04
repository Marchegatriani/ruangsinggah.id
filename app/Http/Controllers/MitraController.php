<?php

namespace App\Http\Controllers;

use App\Models\MitraRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MitraController extends Controller
{
    public function index()
    {
        return Inertia::render('User/MitraOwner');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ownerName' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'kostName' => 'required|string|max:255',
            'kostType' => 'required|string',
            'emptyRooms' => 'required|integer|min:0',
            'address' => 'required|string',
        ]);

        MitraRequest::create([
            'owner_name' => $validated['ownerName'],
            'phone' => $validated['phone'],
            'kost_name' => $validated['kostName'],
            'kost_type' => $validated['kostType'],
            'empty_rooms' => $validated['emptyRooms'],
            'address' => $validated['address'],
        ]);

        return back()->with('message', 'Pendaftaran berhasil dikirim!');
    }
}
