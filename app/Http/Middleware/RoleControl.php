<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleControl
{
    /**
     * Menangani permintaan masuk dan mengecek role secara dinamis.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // 1. Pastikan user sudah login melalui request
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // 2. Ambil role user (admin/user/mitra)
        $userRole = $request->user()->role;

        // 3. Logika pengecekan role sesuai parameter dari route
        if ($userRole !== $role) {
            
            // Jika Admin nyasar ke halaman User, arahkan ke dashboard admin
            if ($userRole === 'admin') {
                return redirect()->route('admin.dashboard');
            }

            // Jika User mencoba masuk ke area yang bukan haknya
            return redirect('/')->with('error', "Akses ditolak! Halaman ini khusus untuk {$role}.");
        }

        return $next($request);
    }
}