<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DatabaseProduct extends Model
{
    protected $fillable = ['campus', 'city', 'area', 'price', 'total_data', 'description', 'cover_image', 'file_type', 'file_path'];

    protected $appends = ['cover_url'];

    public function getCoverUrlAttribute()
    {
        return $this->cover_image 
            ? Storage::url($this->cover_image) 
            : 'https://via.placeholder.com/400?text=No+Cover';
    }
}