<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KostImage extends Model
{
    protected $fillable = ['kost_id', 'url'];

    public function kost()
    {
        return $this->belongsTo(Kost::class);
    }
}
