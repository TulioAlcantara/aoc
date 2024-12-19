local dump = require("dump")
local grid = {}
local fish_position = {}
local moves = {}
local reading_grid = true

for line in io.lines("input") do
	local row = {}
	if line == "" then
		reading_grid = false
	end

	if reading_grid then
		for c in line:gmatch(".") do
			if c == "@" then
				fish_position = { #grid + 1, #row + 1 }
			end
			table.insert(row, c)
		end
		table.insert(grid, row)
	end

	if not reading_grid then
		for c in line:gmatch(".") do
			moves[#moves + 1] = c
		end
	end
end

local directions = {}
directions["^"] = { -1, 0 }
directions["v"] = { 1, 0 }
directions["<"] = { 0, -1 }
directions[">"] = { 0, 1 }

local function get_moveable_line(position, direction)
	local line = { position }
	local new_position = { position[1] + direction[1], position[2] + direction[2] }

	while true do
		table.insert(line, new_position)

		if grid[new_position[1]][new_position[2]] == "#" then
			line = {}
			break
		end

		if grid[new_position[1]][new_position[2]] == "." then
			break
		end

		new_position = { new_position[1] + direction[1], new_position[2] + direction[2] }
	end

	return line
end

local function move_fish(move)
	local new_position = { fish_position[1] + directions[move][1], fish_position[2] + directions[move][2] }

	if grid[new_position[1]][new_position[2]] == "#" then
		return
	end

	if grid[new_position[1]][new_position[2]] == "." then
		grid[new_position[1]][new_position[2]] = "@"
		grid[fish_position[1]][fish_position[2]] = "."
		fish_position = new_position
		return
	end

	if grid[new_position[1]][new_position[2]] == "O" then
		local line = get_moveable_line(new_position, directions[move])
		if #line == 0 then
			return
		end

		for _, position in pairs(line) do
			grid[position[1]][position[2]] = "O"
		end

		grid[new_position[1]][new_position[2]] = "@"
		grid[fish_position[1]][fish_position[2]] = "."
		fish_position = new_position
	end
end

local print_grid = function()
	for _, row in pairs(grid) do
		local line = ""
		for _, c in pairs(row) do
			line = line .. c
		end
		print(line)
	end
	print("\n")
end

local count_boxes = function()
	local count = 0
	for x = 1, #grid do
		for y = 1, #grid[x] do
			if grid[x][y] == "O" then
				count = count + (x - 1) * 100 + (y - 1)
			end
		end
	end
	return count
end

local function part_one()
	for _, move in pairs(moves) do
		move_fish(move)
	end

	return count_boxes()
end

print(part_one())
