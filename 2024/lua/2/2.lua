local reports = {}
local report_index = 1

for line in io.lines("input") do
	local temp = {}
	for item in string.gmatch(line, "%S+") do
		temp[#temp + 1] = item
	end
	reports[report_index] = temp
	report_index = report_index + 1
end

local function part_one()
	local safe_reports = 0
	for i = 1, #reports do
		local increasing = false
		for j = 1, #reports[i] - 1 do
			local base = reports[i][j]
			local next = reports[i][j + 1]

			if j == 1 then
				if base - reports[i][#reports[i]] < 0 then
					increasing = true
				end
			end

			if base - next == 0 then
				break
			end

			if increasing then
				if base - next < -3 or base - next > -1 then
					break
				end
			else
				if base - next > 3 or base - next < 1 then
					break
				end
			end

			if j == #reports[i] - 1 then
				safe_reports = safe_reports + 1
			end
		end
	end
	return safe_reports
end

local function getPossibleBadValues(list)
	local increasing = false
	for j = 1, #list - 1 do
		local base = list[j]
		local next = list[j + 1]

		if j == 1 then
			if base - list[#list] < 0 then
				increasing = true
			end
		end

		if base - next == 0 then
			return { j, j + 1 }
		end

		if increasing then
			if base - next < -3 or base - next > -1 then
				return { j, j + 1 }
			end
		else
			if base - next > 3 or base - next < 1 then
				return { j, j + 1 }
			end
		end

		if j == #list - 1 then
			return {}
		end
	end
end

local function clone_list(list)
	local new_list = {}
	for k, v in pairs(list) do
		new_list[k] = v
	end
	return new_list
end

local function part_two()
	local safe_reports = 0
	for i = 1, #reports do
		local possibleBadValues = getPossibleBadValues(reports[i])

		if #possibleBadValues == 0 then
			safe_reports = safe_reports + 1
			goto skip
		end

		local new_list = clone_list(reports[i])
		table.remove(new_list, possibleBadValues[1])

		if #getPossibleBadValues(new_list) == 0 then
			safe_reports = safe_reports + 1
			goto skip
		end

		new_list = clone_list(reports[i])
		table.remove(new_list, possibleBadValues[2])
		if #getPossibleBadValues(new_list) == 0 then
			safe_reports = safe_reports + 1
			goto skip
		end
		::skip::
	end
	return safe_reports
end

print(part_one())
print(part_two())
