module ApplicationHelper
  def set_party_color(party)
    if party == "Democratic"
      return "dem"
    else
      return "rep"
    end
  end
end
