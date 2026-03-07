<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kost extends Model
{
    protected $fillable = [
        'name', 'type', 'description', 'price', 'address', 
        'latitude', 'longitude', 'is_verified', 
        'facilities', 'rules', 'roomTypes'
    ];

    // Casting sangat penting untuk MySQL agar data terbaca sebagai array di Laravel
    protected $casts = [
        'facilities' => 'array',
        'rules' => 'array',
        'roomTypes' => 'array',
        'is_verified' => 'boolean',
        'price' => 'integer',
    ];
    
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