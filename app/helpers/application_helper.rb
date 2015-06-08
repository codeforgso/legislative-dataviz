module ApplicationHelper

  def set_party_color(party)
    if party == "Democratic"
      return "dem"
    else
      return "rep"
    end
  end

  def get_bills_by_leg_id(id)
    @bills_owned_by = OpenStates::Bill.where(sponsor_id: id).count
    return @bills_owned_by
  end

  def random_hex
    @color = "%06x" % (rand * 0xffffff)
    return @color
  end

end
