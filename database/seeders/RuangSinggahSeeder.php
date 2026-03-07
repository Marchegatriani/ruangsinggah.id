<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Kost;
use App\Models\Campus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RuangSinggahSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Masukkan Data Sulhan (User)
        $user = User::create([
            'name' => 'Marche',
            'email' => 'marchgtry@gmail.com',
            'password' => Hash::make('marche123'), // Password default
            'role' => 'admin',
        ]);

        // 2. Masukkan Profile  Admin
        $user->profile()->create([
            'phone' => '0895197318327',
            'institution' => 'Universitas Hasanuddin',
            'address' => 'jl. bung, tamalanrea indah, kec. tamalanrea, kota makassar',
            'gender' => 'Wanita',
        ]);

        // 3. Masukkan Data Kampus
        $unhas = Campus::create(['name' => 'Universitas Hasanuddin', 'city' => 'Makassar']);
        $uin = Campus::create(['name' => 'UIN Alauddin Samata', 'city' => 'Gowa']);

        // 4. Masukkan Data Kost TN
        $kost = Kost::create([
            'name' => 'Kost TN',
            'type' => 'Putri',
            'address' => 'Jalan Sahabat 4, Tamalanrea, Makassar',
            'latitude' => -5.12656133,
            'longitude' => 119.48820892,
            'price' => 1200000,
            'is_verified' => true,
        ]);

        // 5. Hubungkan Kost TN ke UNHAS (Relasi Pivot)
        $kost->campuses()->attach($unhas->id);

        // 6. Masukkan Foto-foto dari Firebase
        $kost->images()->createMany([
            ['url' => 'https://firebasestorage.googleapis.com/v0/b/ruangsinggahid-3afb2.firebasestorage.app/o/properties%2FVxf3RrgcZoYSugDdN4OW6KZpVqk1%2F5J2bpFvz5wHqTdRFXPJR%2Fimages%2Foriginal%2F1772295729771_PXL_20250724_033136061.jpg?alt=media'],
            ['url' => 'https://firebasestorage.googleapis.com/v0/b/ruangsinggahid-3afb2.firebasestorage.app/o/properties%2FVxf3RrgcZoYSugDdN4OW6KZpVqk1%2F5J2bpFvz5wHqTdRFXPJR%2Fimages%2Foriginal%2F1772319840815_PXL_20250724_033304181.jpg?alt=media'],
        ]);
    }
}