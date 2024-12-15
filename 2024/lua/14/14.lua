local dump = require("dump")
local robots = {}
local grid = {}
-- Example
-- ROWS = 7
-- COLS = 11
ROWS = 103
COLS = 101

local function create_bots()
	robots = {}
	for lines in io.lines("input") do
		local p1, p2, v1, v2 = lines:match("p=([%-%d]+),([%-%d]+) v=([%-%d]+),([%-%d]+)")
		table.insert(robots, { pos = { tonumber(p2 + 1), tonumber(p1 + 1) }, vel = { tonumber(v2), tonumber(v1) } })
	end
end

local function create_grid()
	for i = 1, ROWS do
		grid[i] = {}
		for j = 1, COLS do
			grid[i][j] = "."
		end
	end

	for _, robot in ipairs(robots) do
		local count = grid[robot.pos[1]][robot.pos[2]]
		if count == "." then
			count = 0
		else
			count = tonumber(count)
		end
		grid[robot.pos[1]][robot.pos[2]] = count + 1
	end
end

local function print_grid()
	for i = 1, ROWS do
		print(table.concat(grid[i]))
	end
	print("\n")
end

local function move_robots()
	for _, robot in ipairs(robots) do
		local count = grid[robot.pos[1]][robot.pos[2]]
		if count - 1 == 0 then
			grid[robot.pos[1]][robot.pos[2]] = "."
		else
			grid[robot.pos[1]][robot.pos[2]] = count - 1
		end

		robot.pos[1] = (robot.pos[1] + robot.vel[1]) % ROWS
		robot.pos[2] = (robot.pos[2] + robot.vel[2]) % COLS

		if robot.pos[1] == 0 then
			robot.pos[1] = ROWS
		end

		if robot.pos[2] == 0 then
			robot.pos[2] = COLS
		end

		count = grid[robot.pos[1]][robot.pos[2]]
		if count == "." then
			count = 0
		else
			count = tonumber(count)
		end
		grid[robot.pos[1]][robot.pos[2]] = count + 1
	end
end

local function count_bots(min_row, max_row, min_col, max_col)
	local count = 0
	for i = min_row, max_row do
		for j = min_col, max_col do
			if grid[i][j] ~= "." then
				count = count + grid[i][j]
			end
		end
	end
	return count
end

local function find_tree()
	local tree_i = 0

	while true do
		for i = 1, ROWS do
			for j = 1, COLS do
				if grid[i][j] ~= '.' and grid[i][j] >= 2 then
					goto continue
				end
			end
		end

		break
		::continue::
		move_robots()
		tree_i = tree_i + 1
	end

	return tree_i
end

local function part_one()
	create_bots()
	create_grid()

	local result = 1
	for i = 1, 100 do
		move_robots()
	end

	result = result * count_bots(1, math.floor(ROWS / 2), 1, math.floor(COLS / 2))
	result = result * count_bots(1, math.floor(ROWS / 2), math.ceil(COLS / 2) + 1, COLS)
	result = result * count_bots(math.ceil(ROWS / 2) + 1, ROWS, 1, math.floor(COLS / 2))
	result = result * count_bots(math.ceil(ROWS / 2) + 1, ROWS, math.ceil(COLS / 2) + 1, COLS)

	return result
end

local function part_two()
	create_bots()
	create_grid()
	print("Tree at: " .. find_tree())
	print_grid()
end

print(part_one())
print(part_two())
