import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectionComponent, CalendarInput } from "../../components/Inputs";
import Button from "../../components/Button";
import { Colors } from "../../theme/variables";

Colors
const FilterContent = ({
  fromSelect,
  toSelect,
  selectedVehicle,
  setVehicle,
  setChauffeur,
  clearFilter,
  applyFilter,
  vehicles,
  selectedChauffeur,
  chauffeurs

}) => {
  return (
    <View style={styles.container}>
      <CalendarInput placeholder={'From'} onDateSelect={fromSelect} />
      <CalendarInput placeholder={'To'} onDateSelect={toSelect} />
      <SelectionComponent
        options={vehicles}
        selectedValue={selectedVehicle}
        onValueChange={(e) => { setVehicle(e) }}
        placeholder={'Vehicle'}
      />
      <SelectionComponent
        options={chauffeurs}
        selectedValue={selectedChauffeur}
        onValueChange={(e) => { setChauffeur(e) }}
        placeholder={'Chauffeur'}
      />

      <View style={styles.bottomContainer}>
        <Text style={{ color: Colors.primary }} onPress={clearFilter}>Clear All</Text>
        <View style={{ width: '40%' }}>
          <Button label={'Apply'} onPress={applyFilter} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    position: 'relative',
    flex: 1
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderTopColor: 'rgba(139,149,158,.25)',
    borderTopWidth: 1.5,
    paddingTop: 20
  }
})

export default FilterContent;