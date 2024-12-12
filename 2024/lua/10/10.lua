local area = {}
local trailheads = {}
local result_2 = 0

for line in io.lines("input") do
	local row = {}
	for c in line:gmatch(".") do
		row[#row + 1] = tonumber(c)
	end

	area[#area + 1] = row
end

for i = 1, #area do
	for j = 1, #area[i] do
		if area[i][j] == 0 then
			table.insert(trailheads, { i, j })
		end
	end
end

local rows = #area
local cols = #area[1]

local function out_of_bounds(pos)
	if pos[1] > rows or pos[2] > cols or pos[1] < 1 or pos[2] < 1 then
		return true
	end
	return false
end

local function move(dir, pos)
	local x, y = pos[1], pos[2]
	local new_pos = {}
	if dir == "N" then
		new_pos = { x - 1, y }
	elseif dir == "S" then
		new_pos = { x + 1, y }
	elseif dir == "E" then
		new_pos = { x, y + 1 }
	elseif dir == "W" then
		new_pos = { x, y - 1 }
	end

	if out_of_bounds(new_pos) then
		return {}
	end
	return new_pos
end

local function search_top(height, pos, distinct_top_pos_list)
	if #pos == 0 then
		return
	end

	if area[pos[1]][pos[2]] == 9 and height == 9 then
		distinct_top_pos_list[pos[1] .. "," .. pos[2]] = true
		result_2 = result_2 + 1
		return
	end

	if area[pos[1]][pos[2]] ~= height then
		return
	end

	search_top(height + 1, move("N", pos), distinct_top_pos_list)
	search_top(height + 1, move("S", pos), distinct_top_pos_list)
	search_top(height + 1, move("E", pos), distinct_top_pos_list)
	search_top(height + 1, move("W", pos), distinct_top_pos_list)
end

local function part_one_two()
	local result = 0

	for _, trailhead in pairs(trailheads) do
		local top_pos_list = {}
		search_top(0, trailhead, top_pos_list)
		for _, _ in pairs(top_pos_list) do
			result = result + 1
		end
	end

	print(result)
	print(result_2)
end

part_one_two()
