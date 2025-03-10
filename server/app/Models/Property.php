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
        'image1',
        'image2',
        'image3',
    ];

    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }
    
}
