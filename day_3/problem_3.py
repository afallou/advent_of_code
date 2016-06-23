from os import path, getcwd
from collections import Counter

import sys

INSTRUCTIONS_FILENAME = 'pb_3_input.txt'


def get_new_position(pos, move):
	newpos = list(pos)
	if move == '>':
		newpos[0] += 1
	elif move == '^':
		newpos[1] += 1
	elif move == 'v':
		newpos[1] -= 1
	elif move == '<':
		newpos[0] -= 1
	return tuple(newpos)

def part_1():
	with open(path.join(getcwd(), INSTRUCTIONS_FILENAME)) as f:
		instructions = f.read()

	count = Counter()
	# current position
	pos = (0, 0)
	count[pos] += 1
	for inst in instructions:
		pos = get_new_position(pos, inst)
		count[pos] += 1

	# print(count)
	print(len(count))

def part_2():
	with open(path.join(getcwd(), INSTRUCTIONS_FILENAME)) as f:
		instructions = f.read()

	count = Counter()
	# current position
	santa_pos = (0, 0)
	robo_pos = (0, 0)
	count[santa_pos] += 1

	for i, inst in enumerate(instructions):
		if i % 2 == 0:
			santa_pos = get_new_position(santa_pos, inst)
			count[santa_pos] += 1
		elif i % 2 == 1:
			robo_pos = get_new_position(robo_pos, inst)
			count[robo_pos] += 1

	# print(count)
	print(len(count))	

if __name__ == '__main__':
	part_2()



