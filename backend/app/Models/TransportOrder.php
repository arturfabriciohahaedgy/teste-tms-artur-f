<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TransportOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'driver_id',
        'origin_address',
        'destination_address',
        'cargo_description',
        'weight_kg',
        'status',
        'scheduled_date',
        'notes'
    ];
}

