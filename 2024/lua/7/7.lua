local data = {}
local invalid_data = {}

for line in io.lines("input") do
	local row = {}

	for item in string.gmatch(line, "([^:]+)") do
		row[#row + 1] = item
	end

	data[row[1]] = {}

	local values_array = {}
	for item in string.gmatch(row[2], "([^ ]+)") do
		values_array[#values_array + 1] = item
	end

	data[row[1]] = values_array
end

local function search_target(index, total, target, vals)
	if index == #vals then
		if tonumber(total) == tonumber(target) then
			return true
		end
		return false
	end

	if search_target(index + 1, total + vals[index + 1], target, vals) then
		return true
	end
	if search_target(index + 1, total * vals[index + 1], target, vals) then
		return true
	end

	return false
end

local function search_target_2(index, total, target, vals)
	if index == #vals then
		if tonumber(total) == tonumber(target) then
			return true
		end
		return false
	end

	if search_target_2(index + 1, total + vals[index + 1], target, vals) then
		return true
	end

	if search_target_2(index + 1, total * vals[index + 1], target, vals) then
		return true
	end

	if search_target_2(index + 1, tonumber(total .. vals[index + 1]), target, vals) then
		return true
	end

	return false
end

local function part_one()
	local result = 0

	for target, vals in pairs(data) do
		if search_target(1, vals[1], target, vals) then
			result = result + target
		end
	end

	return result
end

local function part_two()
	local result = 0

	for target, vals in pairs(data) do
		if search_target_2(1, vals[1], target, vals) then
			result = result + target
		end
	end

	return result
end

print(part_one())
print(part_two())
