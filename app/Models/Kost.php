<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kost extends Model
{
    protected $guarded = []; // Agar semua kolom bisa diisi cepat

    // Relasi ke Gambar (Satu Kost punya Banyak Foto)
    public function images()
    {
        return $this->hasMany(KostImage::class);
    }

    // Relasi ke Kampus (Satu Kost dekat Banyak Kampus)
    public function campuses()
    {
        return $this->belongsToMany(Campus::class);
    }
}