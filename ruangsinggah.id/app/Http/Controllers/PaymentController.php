<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Webhook/Notification Handler
     * Ini fungsi yang dipanggil otomatis oleh Midtrans/Xendit
     */
    public function notification(Request $request)
    {
        // 1. Ambil data dari Payment Gateway (Contoh format Midtrans)
        $bookingCode = $request->order_id; 
        $statusCode = $request->transaction_status; // 'settlement' artinya LUNAS

        // 2. Cari data booking di database kita
        $booking = Booking::where('booking_code', $bookingCode)->first();

        if ($booking) {
            if ($statusCode == 'settlement' || $statusCode == 'capture') {
                // UPDATE STATUS JADI SUDAH BAYAR
                $booking->update([
                    'status' => 'success',
                    'payment_status' => 'paid'
                ]);
            } elseif ($statusCode == 'pending') {
                $booking->update(['payment_status' => 'waiting']);
            } else {
                $booking->update(['status' => 'cancelled', 'payment_status' => 'failed']);
            }
        }

        return response()->json(['status' => 'OK']);
    }
}