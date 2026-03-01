<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    // Menampilkan riwayat sewa user (Penting untuk juri lihat alur user)
    public function index()
    {
        $myBookings = Booking::with('kost.images')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'bookings' => $myBookings
        ]);
    }

    // Proses menyimpan booking baru
    public function store(Request $request)
    {
        $request->validate([
            'kost_id' => 'required|exists:kosts,id',
            'start_date' => 'required|date',
        ]);

        $kost = Kost::find($request->kost_id);

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'kost_id' => $request->kost_id,
            'booking_code' => 'RS-' . strtoupper(Str::random(6)),
            'total_price' => $kost->price, // Bisa dikalikan dengan durasi nanti
            'status' => 'pending',
            'start_date' => $request->start_date,
        ]);

        // Setelah simpan, arahkan ke halaman sukses atau dashboard
        return redirect()->route('dashboard')->with('message', 'Booking berhasil diajukan!');
    }
}