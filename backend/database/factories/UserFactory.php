<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'phone' => '09' . fake()->unique()->numerify('########'),
            'email' => fake()->unique()->safeEmail(),
            'password' => 'Secret123!',
            'role' => 'FARMER',
            'account_type' => 'INDIVIDUAL',
            'full_name' => fake()->name(),
            'status' => 'ACTIVE',
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the user is a Farmer.
     */
    public function farmer(string $accountType = 'INDIVIDUAL'): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'FARMER',
            'account_type' => $accountType,
        ]);
    }

    /**
     * Indicate that the user is a Buyer.
     */
    public function buyer(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'BUYER',
            'account_type' => null,
        ]);
    }

    /**
     * Indicate that the user is an Admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'ADMIN',
            'account_type' => null,
        ]);
    }

    /**
     * Indicate that the user is suspended.
     */
    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'SUSPENDED',
        ]);
    }
}
