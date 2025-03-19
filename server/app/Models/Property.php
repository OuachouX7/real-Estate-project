<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'location',
        'is_available',
    ];

    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }
    
}
