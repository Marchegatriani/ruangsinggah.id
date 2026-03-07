<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DatabaseOrder extends Model
{
    protected $fillable = [
        'user_id', 'database_product_id', 'order_code', 
        'amount', 'status', 'payment_method', 'transfer_proof'
    ];

    protected $appends = ['proof_url'];

    // Relasi ke User
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Database Product
    public function databaseProduct() {
        return $this->belongsTo(DatabaseProduct::class);
    }

    // Accessor untuk mempermudah pemanggilan URL bukti transfer di React
    public function getProofUrlAttribute() {
        return $this->transfer_proof 
            ? asset('storage/' . $this->transfer_proof) 
            : null;
    }
}