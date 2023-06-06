import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectionComponent, CalendarInput } from "../../components/Inputs";
import Button from "../../components/Button";
import { Colors } from "../../theme/variables";

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
  chauffeurs,
  selectedFrom,
  selectedTo
}) => {
  return (
    <View style={styles.container}>
      <CalendarInput placeholder={'From'} onDateSelect={fromSelect} value={selectedFrom} />
      <CalendarInput placeholder={'To'} onDateSelect={toSelect} value={selectedTo} />
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
        <Text style={{ color: Colors.primary, fontSize: 17, fontWeight: 900 }} onPress={clearFilter}>Clear All</Text>
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
    flex: 1,
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