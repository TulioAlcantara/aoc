local area = {}
local antennas = {}

for line in io.lines("input") do
	local row = {}
	for c in line:gmatch(".") do
		row[#row + 1] = c
	end

	area[#area + 1] = row
end

for i = 1, #area do
	for j = 1, #area[i] do
		if area[i][j] ~= "." then
			if antennas[area[i][j]] == nil then
				antennas[area[i][j]] = {}
			end

			table.insert(antennas[area[i][j]], { i, j })
		end
	end
end

local cols = #area
local rows = #area[1]

local function in_range(x, y)
	if x <= rows and y <= cols and x > 0 and y > 0 then
		return true
	end
	return false
end

local function remove_duplicates(list)
	local hash = {}
	for _, v in ipairs(list) do
		hash[table.concat(v, ",")] = true
	end

	local new_list = {}
	for k, _ in pairs(hash) do
		local new_val = {}
		for v in string.gmatch(k, "([^,]+)") do
			new_val[#new_val + 1] = tonumber(v)
		end
		new_list[#new_list + 1] = new_val
	end

	return new_list
end

local function part_one()
	local antinodes = {}
	local result = 0

	for _, antenna_pos in pairs(antennas) do
		for i = 1, #antenna_pos do
			local reference = antenna_pos[i]
			for j = 1, #antenna_pos do
				local compare = antenna_pos[j]
				if reference ~= compare then
					local distance = { reference[1] - compare[1], reference[2] - compare[2] }
					table.insert(antinodes, { reference[1] + distance[1], reference[2] + distance[2] })
				end
			end
		end
	end

	local antinodes_formatted = remove_duplicates(antinodes)

	for _, antinode in pairs(antinodes_formatted) do
		if in_range(antinode[1], antinode[2]) then
			result = result + 1
		end
	end

	return result
end

local function part_two()
	local result = 0
	local antinodes = {}

	for _, antenna_pos in pairs(antennas) do
		for i = 1, #antenna_pos do
			local reference = antenna_pos[i]
			for j = 1, #antenna_pos do
				local compare = antenna_pos[j]
				if reference ~= compare then
					local distance = { reference[1] - compare[1], reference[2] - compare[2] }
					local new_antinode = { reference[1] + distance[1], reference[2] + distance[2] }
					table.insert(antinodes, new_antinode)
					table.insert(antinodes, compare)

					while in_range(new_antinode[1] + distance[1], new_antinode[2] + distance[2]) do
						new_antinode = { new_antinode[1] + distance[1], new_antinode[2] + distance[2] }
						table.insert(antinodes, new_antinode)
					end
				end
			end
		end
	end

	local antinodes_formatted = remove_duplicates(antinodes)

	for _, antinode in pairs(antinodes_formatted) do
		if in_range(antinode[1], antinode[2]) then
			result = result + 1
		end
	end

	return result
end

print(part_one())
print(part_two())
