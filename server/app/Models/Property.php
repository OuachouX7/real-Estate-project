<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Property extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price',
        'location',
        'bedrooms',
        'bathrooms',
        'square_feet',
        'property_type',
        'is_available',
    ];

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected static function booted()
    {
        static::creating(function ($property) {
            if (empty($property->id)) {
                $property->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Define the relationship with the User model.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
