from os import path, getcwd

STARTING_FLOOR = 0
INSTRUCTIONS_FILENAME = 'pb_1_input.txt'

instructions_path = path.join(getcwd(), INSTRUCTIONS_FILENAME)


def digitize(instruction):
	if instruction == '(':
		return 1
	elif instruction == ')':
		return -1
	else:
		return 0

def part_1():
	with open(instructions_path) as f:
		instructions = f.read()
	
	numerical_instructions = [digitize(inst) for inst in instructions]
	final_floor = STARTING_FLOOR + sum(numerical_instructions)

	print(final_floor)
	return numerical_instructions

def part_2():
	numinst = part_1()

	current_floor = [0] * (len(numinst) + 1)
	for i in range(len(numinst)):
		current_floor[i + 1] = current_floor[i] + numinst[i]

	basement_idx = next(idx for (idx, val) in enumerate(current_floor) if val < 0)
	print(basement_idx)

if __name__ == '__main__':
	part_2()