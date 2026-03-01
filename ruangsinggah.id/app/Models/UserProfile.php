<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    // app/Models/UserProfile.php
    protected $fillable = [
        'user_id', 'phone', 'institution', 'address', 'gender', 'religion'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
