<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Booking;
use App\Models\DatabaseProduct;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalUsers' => User::where('role', 'user')->count(),
            'totalRevenue' => Booking::where('status', 'success')->sum('total_price') ?? 0,
            // 'totalMitra' => DB::table('mitras')->where('status', 'approved')->count() ?? 0,
            
            'totalDb' => DatabaseProduct::count(),
        ];

        // Data tren 6 bulan terakhir
        $trendData = collect(range(5, 0))->map(function ($i) {
            $date = now()->subMonths($i);
            return [
                'time' => $date->format('M'),
                'pengguna' => User::where('role', 'user')->whereMonth('created_at', $date->month)->count(),
                'pendapatan' => Booking::where('status', 'success')->whereMonth('created_at', $date->month)->sum('total_price') ?? 0,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'trendData' => $trendData,
        ]);
    }
}