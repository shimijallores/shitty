<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LocalDisk extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'parent_id'];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(LocalDisk::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(LocalDisk::class, 'parent_id', 'id');
    }
}
