<?php

declare(strict_types=1);

namespace App\Service;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\SvgWriter;

/**
 * Service responsible for generating QR codes as inline SVG data-URIs.
 *
 * Wraps the endroid/qr-code library and exposes a single high-level method
 * so that consumers are decoupled from the underlying QR library.
 */
final class QrCodeService
{
    /**
     * Builds a 280×280 SVG QR code for the given URL and returns it
     * encoded as a data-URI (data:image/svg+xml;base64,...) suitable
     * for embedding directly in a JSON API response or an <img> src.
     *
     * @param string $url The target URL to encode inside the QR code
     *
     * @return string A base64-encoded SVG data-URI
     */
    public function generateSvgDataUri(string $url): string
    {
        $result = Builder::create()
            ->writer(new SvgWriter())
            ->data($url)
            ->size(280)
            ->margin(8)
            ->build();

        return $result->getDataUri();
    }
}
