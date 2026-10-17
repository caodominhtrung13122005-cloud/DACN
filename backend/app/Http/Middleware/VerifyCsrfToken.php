<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];

    /**
     * Determine if the application and environment is running unit tests.
     */
    protected function runningUnitTests(): bool
    {
        if (app()->bound('enforce.csrf')) {
            return false;
        }

        return parent::runningUnitTests();
    }
}
