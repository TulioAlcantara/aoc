local dump = require("dump")
local grid = {}
local fish_position = {}
local moves = {}
local directions = {}
local reading_grid = true
directions["^"] = { -1, 0 }
directions["v"] = { 1, 0 }
directions["<"] = { 0, -1 }
directions[">"] = { 0, 1 }

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

for line in io.lines("input") do
	local row = {}
	if line == "" then
		reading_grid = false
	end

	if reading_grid then
		for c in line:gmatch(".") do
			if c == "@" then
				fish_position = { #grid + 1, #row + 1 }
				table.insert(row, "@")
				table.insert(row, ".")
			end
			if c == "O" then
				table.insert(row, "[")
				table.insert(row, "]")
			end
			if c == "#" then
				table.insert(row, "#")
				table.insert(row, "#")
			end
			if c == "." then
				table.insert(row, ".")
				table.insert(row, ".")
			end
		end
		table.insert(grid, row)
	end

	if not reading_grid then
		for c in line:gmatch(".") do
			moves[#moves + 1] = c
		end
	end
end

local function get_moveable_horizontal_line(position, direction)
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

local function can_push_vertically(pos, delta)
	local new_position = { pos[1] + delta, pos[2] }
	if grid[new_position[1]][new_position[2]] == "#" then
		return false
	end

	if grid[new_position[1]][new_position[2]] == "." then
		return true
	end

	if grid[new_position[1]][new_position[2]] == "[" then
		return can_push_vertically(new_position, delta)
			and can_push_vertically({ new_position[1], new_position[2] + 1 }, delta)
	end

	if grid[new_position[1]][new_position[2]] == "]" then
		return can_push_vertically(new_position, delta)
			and can_push_vertically({ new_position[1], new_position[2] - 1 }, delta)
	end
end

local function move_boxes_vertically(pos, delta)
	local new_position = { pos[1] + delta, pos[2] }
	if grid[new_position[1]][new_position[2]] == "." then
		grid[new_position[1]][new_position[2]] = grid[pos[1]][pos[2]]
		grid[pos[1]][pos[2]] = "."
	elseif grid[new_position[1]][new_position[2]] == "[" then
		move_boxes_vertically(new_position, delta)
		move_boxes_vertically({ new_position[1], new_position[2] + 1 }, delta)
		grid[new_position[1]][new_position[2]] = grid[pos[1]][pos[2]]
		grid[pos[1]][pos[2]] = "."
	elseif grid[new_position[1]][new_position[2]] == "]" then
		move_boxes_vertically(new_position, delta)
		move_boxes_vertically({ new_position[1], new_position[2] - 1 }, delta)
		grid[new_position[1]][new_position[2]] = grid[pos[1]][pos[2]]
		grid[pos[1]][pos[2]] = "."
	end
end

local function move_fish(move)
	local new_position = { fish_position[1] + directions[move][1], fish_position[2] + directions[move][2] }

	if grid[new_position[1]][new_position[2]] == "." then
		grid[new_position[1]][new_position[2]] = "@"
		grid[fish_position[1]][fish_position[2]] = "."
		fish_position = new_position
	end

	if grid[new_position[1]][new_position[2]] == "[" or grid[new_position[1]][new_position[2]] == "]" then
		if move == "<" or move == ">" then
			local line = get_moveable_horizontal_line(new_position, directions[move])
			if #line == 0 then
				return
			end

			for i = #line, 2, -1 do
				grid[line[i][1]][line[i][2]] = grid[line[i - 1][1]][line[i - 1][2]]
			end

			grid[new_position[1]][new_position[2]] = "@"
			grid[fish_position[1]][fish_position[2]] = "."
			fish_position = new_position
		end

		if move == "^" or move == "v" then
			local delta = -1
			if move == "v" then
				delta = 1
			end
			if can_push_vertically(fish_position, delta) then
				move_boxes_vertically(fish_position, delta)

				grid[new_position[1]][new_position[2]] = "@"
				grid[fish_position[1]][fish_position[2]] = "."
				fish_position = new_position
			end
		end
	end
end

local count_boxes = function()
	local count = 0
	for x = 1, #grid do
		for y = 1, #grid[x] do
			if grid[x][y] == "[" then
				count = count + (x - 1) * 100 + (y - 1)
			end
		end
	end
	return count
end

local function part_two()
	for _, move in pairs(moves) do
		move_fish(move)
	end

	return count_boxes()
end

print(part_two())
