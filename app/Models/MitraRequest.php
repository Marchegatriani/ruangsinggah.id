<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MitraRequest extends Model
{
    protected $fillable = [
        'owner_name', 'phone', 'kost_name', 'kost_type', 'empty_rooms', 'address', 'status'
    ];
}
