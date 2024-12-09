local order_tuples = {}
local steps_list = {}
local invalid_steps = {}
local getting_order = true

for line in io.lines("input") do
	if line == "" then
		getting_order = false
		goto skip
	end

	if getting_order then
		local order = {}
		for part in string.gmatch(line, "([^|]+)") do
			table.insert(order, part)
		end
		order_tuples[#order_tuples + 1] = order
	else
		local instruction = {}
		for part in string.gmatch(line, "([^,]+)") do
			table.insert(instruction, part)
		end
		table.insert(steps_list, instruction)
	end
	::skip::
end

local function check_order(a, b)
	for _, tuple in ipairs(order_tuples) do
		if tuple[1] == a and tuple[2] == b then
			return true
		end
	end
	return false
end

local function fix_steps(steps)
	local fixed_steps = steps
	local valid = false

	while not valid do
		::reset::
		for i = 1, #fixed_steps - 1 do
			if not check_order(fixed_steps[i], fixed_steps[i + 1]) then
				local tmp = fixed_steps[i]
				fixed_steps[i] = fixed_steps[i + 1]
				fixed_steps[i + 1] = tmp
				goto reset
			end
		end

		valid = true
	end
	return fixed_steps
end

local function part_one()
	local result = 0

	for _, steps in pairs(steps_list) do
		local valid = false
		for i = 1, #steps - 1 do
			valid = check_order(steps[i], steps[i + 1])
			if not valid then
				invalid_steps[#invalid_steps + 1] = steps
				break
			end
		end
		if valid then
			result = result + steps[math.floor(#steps / 2) + 1]
		end
	end

	return result
end

local function part_two()
	local result = 0
	for _, steps in ipairs(invalid_steps) do
		local fixed_steps = steps
		fixed_steps = fix_steps(steps)
		result = result + fixed_steps[math.floor(#fixed_steps / 2) + 1]
	end

	return result
end

print(part_one())
print(part_two())
