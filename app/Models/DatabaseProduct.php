<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DatabaseProduct extends Model
{
    protected $fillable = [
        'campus', 'city', 'area', 'price', 
        'total_data', 'description', 'cover_image', 
        'file_type', 'file_path'
    ];

    protected $appends = ['cover_url', 'file_url'];

    protected $casts = [
        'price' => 'integer',
        'total_data' => 'integer',
    ];

    // Accessor untuk URL Cover Image
    public function getCoverUrlAttribute()
    {
        return $this->cover_image 
            ? asset('storage/' . $this->cover_image) 
            : 'https://via.placeholder.com/400?text=No+Cover';
    }

    // Accessor untuk URL File (Hanya jika tipe upload)
    public function getFileUrlAttribute()
    {
        if ($this->file_type === 'upload' && $this->file_path) {
            return asset('storage/' . $this->file_path);
        }
        return $this->file_path; // Return link langsung jika tipe 'link'
    }

    public function orders() {
        return $this->hasMany(DatabaseOrder::class);
    }
}