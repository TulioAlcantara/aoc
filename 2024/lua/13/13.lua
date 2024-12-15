local dump = require("dump")
local claw_machines = {}
local new_claw_machine = {}

for line in io.lines("input") do
	if line:match("^%s*$") then
		claw_machines[#claw_machines + 1] = new_claw_machine
		new_claw_machine = {}
		goto skip
	end
	local key, x, y = line:match("(%w+ %w+): X([%+%=%-]%d+), Y([%+%=%-]%d+)")
	if not key then
		key, x, y = line:match("(Prize): X=([%-%d]+), Y=([%-%d]+)")
	end

	if key == "Button A" then
		key = "a"
	elseif key == "Button B" then
		key = "b"
	elseif key == "Prize" then
		key = "prize"
	end

	new_claw_machine[key] = { tonumber(x), tonumber(y) }

	::skip::
end


local function solve_linear_system(a1, a2, b1, b2, c1, c2)
	local det = a1 * b2 - a2 * b1
	if det == 0 then
		return nil
	end

	local a = (b2 * c1 - b1 * c2) / det
	local b = (a1 * c2 - a2 * c1) / det

	local threshold = 1e-3

	if a < 0 or b < 0 then
		return nil
	end

	if a - math.floor(a) > threshold or b - math.floor(b) > threshold then
		return nil
	end

	return { math.floor(a), math.floor(b) }
end

local function part_one()
	local result = 0

	for _, claw_machine in ipairs(claw_machines) do
		local combination = solve_linear_system(claw_machine.a[1], claw_machine.a[2], claw_machine.b[1], claw_machine.b[2],
			claw_machine.prize[1], claw_machine.prize[2])
		if combination then
			result = result + combination[1] * 3 + combination[2]
		end
	end

	return result
end

local function part_two()
	local result = 0
	for _, claw_machine in ipairs(claw_machines) do
		local combination = solve_linear_system(claw_machine.a[1], claw_machine.a[2], claw_machine.b[1], claw_machine.b[2],
			claw_machine.prize[1] + 10000000000000, claw_machine.prize[2] + 10000000000000)
		if combination then
			result = result + combination[1] * 3 + combination[2]
		end
	end

	return result
end

print(part_one())
print(part_two())
