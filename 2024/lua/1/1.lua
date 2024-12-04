local first_list = {}
local second_list = {}
local file_index = 1

for line in io.lines("input") do
	first_list[file_index] = string.match(line, "%S+")
	second_list[file_index] = string.match(line, "%S+$")
	file_index = file_index + 1
end

table.sort(first_list)
table.sort(second_list)

local function part_one()
	local result = 0
	for i = 1, #first_list do
		if first_list[i] > second_list[i] then
			result = result + first_list[i] - second_list[i]
		elseif first_list[i] < second_list[i] then
			result = result + second_list[i] - first_list[i]
		end
	end
	return result
end

local function part_two()
	local reference_list = {}
	local result = 0
	for i = 1, #first_list do
		reference_list[first_list[i]] = 0
	end

	for i = 1, #second_list do
		if reference_list[second_list[i]] then
			reference_list[second_list[i]] = reference_list[second_list[i]] + 1
		end
	end

	for key, val in pairs(reference_list) do
		result = result + key * val
	end
	return result
end

print(part_one())
print(part_two())
