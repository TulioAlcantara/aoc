local dump = require("dump")
local farm = {}
local plants = {}

local function create_farm()
	for line in io.lines("input") do
		local row = {}
		for c in line:gmatch(".") do
			row[#row + 1] = c
		end

		farm[#farm + 1] = row
	end
end

local function get_plant_perimeter(plant)
	local perimeter = 0

	for _, plants_coordinates in ipairs(plant.coordinates) do
		local x, y = plants_coordinates[1], plants_coordinates[2]
		if x == 1 or farm[x - 1][y] ~= plant.char then
			perimeter = perimeter + 1
		end
		if x == #farm or farm[x + 1][y] ~= plant.char then
			perimeter = perimeter + 1
		end
		if y == 1 or farm[x][y - 1] ~= plant.char then
			perimeter = perimeter + 1
		end
		if y == #farm[x] or farm[x][y + 1] ~= plant.char then
			perimeter = perimeter + 1
		end
	end

	return perimeter
end

local out_of_bounds = function(x, y)
	return x < 1 or x > #farm or y < 1 or y > #farm[x]
end

local function outside_plant(x, y, char)
	if out_of_bounds(x, y) or farm[x][y] ~= char then
		return true
	end
	return false
end

local function count_corners(plant)
	local corners = 0

	local outer_corners = {
		{ { -1, 0 }, { 0, -1 } },
		{ { -1, 0 }, { 0, 1 } },
		{ { 1, 0 }, { 0, -1 } },
		{ { 1, 0 }, { 0, 1 } },
	}

	local inner_corners = {
		{ { -1, 0 }, { 0, -1 }, { -1, -1 } },
		{ { -1, 0 }, { 0, 1 }, { -1, 1 } },
		{ { 1, 0 }, { 0, -1 }, { 1, -1 } },
		{ { 1, 0 }, { 0, 1 }, { 1, 1 } },
	}

	for _, plants_coordinates in ipairs(plant.coordinates) do
		local x, y = plants_coordinates[1], plants_coordinates[2]
		for _, corner in ipairs(outer_corners) do
			local x1, y1 = x + corner[1][1], y + corner[1][2]
			local x2, y2 = x + corner[2][1], y + corner[2][2]
			if outside_plant(x1, y1, plant.char) and outside_plant(x2, y2, plant.char) then
				corners = corners + 1
			end
		end

		for _, corner in ipairs(inner_corners) do
			local x1, y1 = x + corner[1][1], y + corner[1][2]
			local x2, y2 = x + corner[2][1], y + corner[2][2]
			local x3, y3 = x + corner[3][1], y + corner[3][2]
			if
				not outside_plant(x1, y1, plant.char)
				and not outside_plant(x2, y2, plant.char)
				and outside_plant(x3, y3, plant.char)
			then
				corners = corners + 1
			end
		end
	end

	return corners
end

local function landfill(new_plant, x, y)
	if x > 1 and farm[x - 1][y] == new_plant.char then
		farm[x - 1][y] = "."
		new_plant.area = new_plant.area + 1
		table.insert(new_plant.coordinates, { x - 1, y })
		landfill(new_plant, x - 1, y)
	end
	if x < #farm and farm[x + 1][y] == new_plant.char then
		farm[x + 1][y] = "."
		new_plant.area = new_plant.area + 1
		table.insert(new_plant.coordinates, { x + 1, y })
		landfill(new_plant, x + 1, y)
	end
	if y > 1 and farm[x][y - 1] == new_plant.char then
		farm[x][y - 1] = "."
		new_plant.area = new_plant.area + 1
		table.insert(new_plant.coordinates, { x, y - 1 })
		landfill(new_plant, x, y - 1)
	end
	if y < #farm[x] and farm[x][y + 1] == new_plant.char then
		farm[x][y + 1] = "."
		new_plant.area = new_plant.area + 1
		table.insert(new_plant.coordinates, { x, y + 1 })
		landfill(new_plant, x, y + 1)
	end
end

local function part_one()
	create_farm()
	local result = 0

	for i = 1, #farm do
		for j = 1, #farm[i] do
			if farm[i][j] ~= "." then
				local new_plant = { area = 1, perimeter = 0, coordinates = { { i, j } }, char = farm[i][j] }
				farm[i][j] = "."
				landfill(new_plant, i, j)
				table.insert(plants, new_plant)
			end
		end
	end

	farm = {}
	create_farm()
	for _, plant in ipairs(plants) do
		plant.perimeter = get_plant_perimeter(plant)
		result = result + plant.area * plant.perimeter
	end

	return result
end

local function part_two()
	local result = 0

	farm = {}
	create_farm()
	for _, plant in ipairs(plants) do
		local corners = count_corners(plant)
		result = result + plant.area * corners
	end

	return result
end

print(part_one())
print(part_two())
