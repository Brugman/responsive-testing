# Responsive Testing

Responsive Testing displays your website in adjacent iframes, so you can check multiple viewports while writing responsive CSS.

![Demo](/demo.gif)

## Requirements

- Apache (any webserver)
- PHP

## Installation

1. Copy `app/config-example.php` to `app/config.php`.
1. Map `public_html` to a domain.

## Usage

1. Visit the webapp.
1. Choose a preset.
1. Enter a URL.
1. Hit Enter.

Work on your website with Browsersync/LiveReload/Live.js, and watch the viewports.

## Configuration

`app/config.php` contains an array with your viewport presets. This file will not overwritten by updates.

## Query String configuration

The chosen preset and URL are stored in, and loaded from, the query string. This allows you to bookmark multiple projects with different presets, and load them without having to reconfigure.

For example:
```
/?preset=bs-4&url=https%3A%2F%2Ftimbrugman.com%2F
```

You can also remove either of these parameters to load the config page partially preconfigured.

For example:
```
/?preset=bs-4
/?url=https%3A%2F%2Ftimbrugman.com%2F
```

## Contributing

If there's anything you'd like to see added or changed, please open an issue so we can talk about it. Forking it is cool too.

## License

[MIT](/LICENSE) &copy; [Tim Brugman](https://timbrugman.com/)