local maze = {}
local current_pos = {}
local initial_pos = {}
local visited_pos = {}
local col_count = 0
local row_count = 0
local current_dir = "UP"
local visited_pos_loop = {}

for line in io.lines("input") do
	row_count = row_count + 1
	col_count = 0
	local row = {}
	for c in line:gmatch(".") do
		col_count = col_count + 1
		if c == "^" then
			current_pos = { row_count, col_count }
			initial_pos = { row_count, col_count }
		end
		row[#row + 1] = c
	end

	maze[#maze + 1] = row
end

local function found_obstacle(pos, new_dir)
	if pos[1] > col_count or pos[1] < 1 or pos[2] > row_count or pos[2] < 1 then
		return false
	end
	if maze[pos[1]][pos[2]] == "#" then
		return true
	end
	return false
end

local function mark_position()
	if maze[current_pos[1]][current_pos[2]] ~= "X" then
		visited_pos[#visited_pos + 1] = { current_pos[1], current_pos[2] }
	end
	maze[current_pos[1]][current_pos[2]] = "X"
end

local function mark_position_loop()
	if visited_pos_loop[current_pos[1] .. "," .. current_pos[2]] == nil then
		visited_pos_loop[current_pos[1] .. "," .. current_pos[2]] = current_dir
	end
end

local function move(dir)
	if dir == "UP" then
		if found_obstacle({ current_pos[1] - 1, current_pos[2] }, "RIGHT") then
			return "RIGHT"
		end
		current_pos = { current_pos[1] - 1, current_pos[2] }
		return "UP"
	end
	if dir == "RIGHT" then
		if found_obstacle({ current_pos[1], current_pos[2] + 1 }, "DOWN") then
			return "DOWN"
		end
		current_pos = { current_pos[1], current_pos[2] + 1 }
		return "RIGHT"
	end
	if dir == "DOWN" then
		if found_obstacle({ current_pos[1] + 1, current_pos[2] }, "LEFT") then
			return "LEFT"
		end
		current_pos = { current_pos[1] + 1, current_pos[2] }
		return "DOWN"
	end
	if dir == "LEFT" then
		if found_obstacle({ current_pos[1], current_pos[2] - 1 }, "UP") then
			return "UP"
		end
		current_pos = { current_pos[1], current_pos[2] - 1 }
		return "LEFT"
	end
end

local function part_one()
	local result = 1
	mark_position()

	while true do
		current_dir = move(current_dir)

		if current_pos[1] > col_count or current_pos[1] < 1 or current_pos[2] > row_count or current_pos[2] < 1 then
			break
		end

		if maze[current_pos[1]][current_pos[2]] ~= "X" then
			result = result + 1
		end

		mark_position()
	end

	return result
end

local function part_two()
	local result = 0
	for i = 1, #visited_pos do
		maze[visited_pos[i][1]][visited_pos[i][2]] = "#"

		current_dir = "UP"
		current_pos = { initial_pos[1], initial_pos[2] }

		mark_position_loop()

		while true do
			current_dir = move(current_dir)

			if current_pos[1] > col_count or current_pos[1] < 1 or current_pos[2] > row_count or current_pos[2] < 1 then
				break
			end

			if visited_pos_loop[current_pos[1] .. "," .. current_pos[2]] == current_dir then
				result = result + 1
				break
			end

			mark_position_loop()
		end

		maze[visited_pos[i][1]][visited_pos[i][2]] = "X"
		visited_pos_loop = {}
	end

	return result
end

print(part_one())
print(part_two())
