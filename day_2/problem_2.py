from os import path, getcwd

DIM_SEPARATOR = 'x'
INSTRUCTIONS_FILENAME = 'pb_2_input.txt'

def wrapping_area(length, width, height):
	areas = [0.] * 3
	areas[0] = length * width
	areas[1] = width * height
	areas[2] = length * height
	return 2 * sum(areas) + min(areas)

def ribbon_length(length, width, height):
	perimeters = [0] * 3
	perimeters[0] = length + width
	perimeters[1] = width + height
	perimeters[2] = length + height

	volume = length * width * height
	return 2 * min(perimeters) + volume


def extract_dimensions(filepath):
	"""
	Generator returning a list with the dimensions of the present
	"""
	with open(filepath) as f:
		for line in f:
			yield [float(val) for val in line.split(DIM_SEPARATOR)]

def part_1():
	total_wrapping = 0
	for dims in extract_dimensions(path.join(getcwd(), INSTRUCTIONS_FILENAME)):
		wrapping = wrapping_area(*dims)
		total_wrapping += wrapping
	print(total_wrapping)
	return total_wrapping

def part_2():
	total_ribbon = 0
	for dims in extract_dimensions(path.join(getcwd(), INSTRUCTIONS_FILENAME)):
		ribbon = ribbon_length(*dims)
		total_ribbon += ribbon
	print(total_ribbon)
	return total_ribbon

if __name__ == '__main__':
	part_2()