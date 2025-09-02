<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LocalDisk>
 */
class LocalDiskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word() . '.' . fake()->fileExtension(),
            'type' => fake()->randomElement(['file', 'folder']),
            'parent_id' => 1
        ];
    }
}
