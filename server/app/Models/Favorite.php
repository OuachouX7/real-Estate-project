<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = ['user_id', 'property_id'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
    public function propertyImages()
    {
        return $this->hasMany(PropertyImage::class);
    }
}
