# d3-timeline

Simple d3v4 Timeline

![alt text][logo]

[logo]: https://github.com/pjbrof/d3-timeline/blob/master/img/d3-timeline.png "d3 Timeline Demo"

I built this timeline to display my work history which has been an overlapping mess making my resume dates look practically incomprehensible.

Check out these other great d3 timelines. Neither of these fit my immediate needs hopefully one of these three will suit yours. Happy coding! 😆

* [https://github.com/jiahuang/d3-timeline](https://github.com/jiahuang/d3-timeline)

* [https://github.com/commodityvectors/d3-timeline](https://github.com/commodityvectors/d3-timeline)


## Install

__npm__
```sh
$ npm install
```

## Run

__gulp__
```sh
$ gulp
```

## Usage

```html
<div class="d3timeline"></div>
```

Edit `history` with your own start date, end date, and color of the line (hex format), default is black \#000

`present` is reserved for ongoing dates.

```javascript
var timeline = {
	"timeline": "one",
	"children": [
		{
			"startDate": "2012-08",
			"endDate": "present",
			"color": "#000000"
		}
	]
};
```

External JSON and Excel support for using TSV or CSV coming soon.

## License
[MIT License](LICENSE)
